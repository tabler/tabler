import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Dropzone from '../../src/dropzone'

const createFile = (name: string, type = 'text/plain', size = 3): File => new File(['a'.repeat(size)], name, { type })

const transferOf = (files: File[]): DataTransfer => {
  const transfer = new DataTransfer()
  for (const file of files) {
    transfer.items.add(file)
  }

  return transfer
}

const choose = (input: HTMLInputElement, files: File[]): void => {
  input.files = transferOf(files).files
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

const drag = (element: HTMLElement, type: string, files: File[]): DragEvent => {
  const event = new DragEvent(type, { dataTransfer: transferOf(files), bubbles: true, cancelable: true })
  element.dispatchEvent(event)
  return event
}

class FakeXhr extends EventTarget {
  static instances: FakeXhr[] = []
  upload = new EventTarget()
  status = 0
  method = ''
  url = ''
  body: FormData | null = null
  headers: Record<string, string> = {}
  aborted = false

  constructor() {
    super()
    FakeXhr.instances.push(this)
  }

  open(method: string, url: string): void {
    this.method = method
    this.url = url
  }

  setRequestHeader(name: string, value: string): void {
    this.headers[name] = value
  }

  send(body: FormData): void {
    this.body = body
  }

  abort(): void {
    this.aborted = true
  }

  respond(status: number): void {
    this.status = status
    this.dispatchEvent(new Event('load'))
  }
}

describe('Dropzone', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = ['<form>', '  <div class="dropzone" data-bs-toggle="dropzone">', '    <label class="dropzone-area">', '      <input class="dropzone-input" type="file" name="files" multiple />', '      <span class="dropzone-title">Drop files here</span>', '    </label>', '  </div>', '</form>'].join('')
    FakeXhr.instances = []
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    clearFixture()
  })

  const dropzone = (): HTMLElement => fixtureEl.querySelector('.dropzone')!
  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const items = (): HTMLElement[] => [...fixtureEl.querySelectorAll<HTMLElement>('.dropzone-item')]

  describe('NAME', () => {
    it('should return the plugin name', () => {
      expect(Dropzone.NAME).toBe('dropzone')
    })
  })

  describe('constructor', () => {
    it('should append a file list', () => {
      new Dropzone(dropzone())
      expect(dropzone().querySelector('.dropzone-list')).not.toBeNull()
    })

    it('should reuse an existing file list', () => {
      dropzone().insertAdjacentHTML('afterbegin', '<div class="dropzone-list"></div>')
      const instance = new Dropzone(dropzone())
      expect(dropzone().querySelectorAll('.dropzone-list')).toHaveLength(1)

      instance.dispose()
      expect(dropzone().querySelector('.dropzone-list')).not.toBeNull()
    })

    it('should do nothing without a file input', () => {
      input().remove()
      expect(() => new Dropzone(dropzone()).dispose()).not.toThrow()
    })
  })

  describe('choosing files', () => {
    it('should list the chosen files and keep them in the input', () => {
      const instance = new Dropzone(dropzone())
      choose(input(), [createFile('a.txt'), createFile('b.pdf', 'application/pdf')])

      expect(items()).toHaveLength(2)
      expect(items()[0].querySelector('.dropzone-item-name')!.textContent).toBe('a.txt')
      expect(items()[0].querySelector('.dropzone-item-meta')!.textContent).toBe('3 B')
      expect(instance.getFiles()).toHaveLength(2)
      expect(input().files).toHaveLength(2)
    })

    it('should add to the files chosen before', () => {
      new Dropzone(dropzone())
      choose(input(), [createFile('a.txt')])
      choose(input(), [createFile('b.txt')])

      expect([...input().files!].map((file) => file.name)).toEqual(['a.txt', 'b.txt'])
    })

    it('should replace the file when the input is not multiple', () => {
      input().multiple = false
      const instance = new Dropzone(dropzone())
      instance.addFiles([createFile('a.txt')])
      instance.addFiles([createFile('b.txt'), createFile('c.txt')])

      expect(instance.getFiles().map((file) => file.name)).toEqual(['b.txt'])
      expect(items()).toHaveLength(1)
    })

    it('should fire add and added, and skip a file when add is prevented', () => {
      const instance = new Dropzone(dropzone())
      const added = vi.fn()
      dropzone().addEventListener('added.bs.dropzone', added)
      dropzone().addEventListener('add.bs.dropzone', (event) => {
        if ((event as Event & { file: File }).file.name === 'skip.txt') {
          event.preventDefault()
        }
      })

      choose(input(), [createFile('a.txt'), createFile('skip.txt')])

      expect(added).toHaveBeenCalledTimes(1)
      expect(instance.getFiles().map((file) => file.name)).toEqual(['a.txt'])
      expect(input().files).toHaveLength(1)
    })
  })

  describe('validation', () => {
    it('should reject a file that does not match accept', () => {
      input().accept = 'image/*,.pdf'
      const instance = new Dropzone(dropzone())
      const rejected = vi.fn()
      dropzone().addEventListener('rejected.bs.dropzone', rejected)

      choose(input(), [createFile('a.png', 'image/png'), createFile('b.PDF'), createFile('c.txt')])

      expect(instance.getFiles().map((file) => file.name)).toEqual(['a.png', 'b.PDF'])
      expect(rejected).toHaveBeenCalledTimes(1)
      expect((rejected.mock.calls[0][0] as Event & { reason: string }).reason).toBe('type')
      expect(items()[2].classList.contains('dropzone-item-error')).toBe(true)
      expect(input().files).toHaveLength(2)
    })

    it('should reject a file larger than maxSize', () => {
      const instance = new Dropzone(dropzone(), { maxSize: 2048 })
      instance.addFiles([createFile('big.txt', 'text/plain', 4096)])

      expect(instance.getFiles()).toHaveLength(0)
      expect(items()[0].querySelector('.dropzone-item-meta')!.textContent).toBe('File is too large (max 2 kB)')
    })

    it('should reject files over maxFiles', () => {
      dropzone().setAttribute('data-bs-max-files', '1')
      const instance = new Dropzone(dropzone())
      instance.addFiles([createFile('a.txt'), createFile('b.txt')])

      expect(instance.getFiles()).toHaveLength(1)
      expect(items()[1].querySelector('.dropzone-item-meta')!.textContent).toBe('Too many files (max 1)')
    })
  })

  describe('removing files', () => {
    it('should remove a file with its button', () => {
      const instance = new Dropzone(dropzone())
      const removed = vi.fn()
      dropzone().addEventListener('removed.bs.dropzone', removed)
      choose(input(), [createFile('a.txt'), createFile('b.txt')])

      items()[0].querySelector<HTMLElement>('.dropzone-item-remove')!.click()

      expect(instance.getFiles().map((file) => file.name)).toEqual(['b.txt'])
      expect(input().files).toHaveLength(1)
      expect(removed).toHaveBeenCalledTimes(1)
    })

    it('should clear the files on clear() and on form reset', () => {
      const instance = new Dropzone(dropzone())
      instance.addFiles([createFile('a.txt')])
      instance.clear()
      expect(items()).toHaveLength(0)

      instance.addFiles([createFile('a.txt')])
      fixtureEl.querySelector('form')!.reset()
      expect(items()).toHaveLength(0)
      expect(input().files).toHaveLength(0)
    })
  })

  describe('drag and drop', () => {
    it('should mark the dropzone while files are dragged over it', () => {
      new Dropzone(dropzone())

      const event = drag(dropzone(), 'dragover', [createFile('a.txt')])
      expect(event.defaultPrevented).toBe(true)
      expect(dropzone().classList.contains('dropzone-dragover')).toBe(true)

      drag(dropzone(), 'dragleave', [])
      expect(dropzone().classList.contains('dropzone-dragover')).toBe(false)
    })

    it('should add the dropped files', () => {
      const instance = new Dropzone(dropzone())
      drag(dropzone(), 'drop', [createFile('a.txt')])

      expect(instance.getFiles()).toHaveLength(1)
      expect(dropzone().classList.contains('dropzone-dragover')).toBe(false)
    })

    it('should ignore a drop when the input is disabled', () => {
      input().disabled = true
      const instance = new Dropzone(dropzone())
      const event = drag(dropzone(), 'drop', [createFile('a.txt')])

      expect(event.defaultPrevented).toBe(false)
      expect(instance.getFiles()).toHaveLength(0)
    })
  })

  describe('upload', () => {
    beforeEach(() => {
      vi.stubGlobal('XMLHttpRequest', FakeXhr)
    })

    it('should upload each file and keep the input empty', () => {
      const instance = new Dropzone(dropzone(), { url: '/upload', headers: { 'X-Token': 'abc' } })
      const uploaded = vi.fn()
      dropzone().addEventListener('uploaded.bs.dropzone', uploaded)

      instance.addFiles([createFile('a.txt'), createFile('b.txt')])

      expect(FakeXhr.instances).toHaveLength(2)
      const [xhr] = FakeXhr.instances
      expect(xhr.method).toBe('post')
      expect(xhr.url).toBe('/upload')
      expect(xhr.headers['X-Token']).toBe('abc')
      expect((xhr.body!.get('files') as File).name).toBe('a.txt')
      expect(input().files).toHaveLength(0)
      expect(items()[0].classList.contains('dropzone-item-uploading')).toBe(true)

      const progressEvent = new ProgressEvent('progress', { lengthComputable: true, loaded: 1, total: 4 })
      xhr.upload.dispatchEvent(progressEvent)
      expect(items()[0].querySelector<HTMLElement>('.progress-bar')!.style.width).toBe('25%')

      xhr.respond(200)
      expect(items()[0].classList.contains('dropzone-item-success')).toBe(true)
      expect(uploaded).toHaveBeenCalledTimes(1)
    })

    it('should mark a failed upload and send it again on upload()', () => {
      const instance = new Dropzone(dropzone(), { url: '/upload' })
      const failed = vi.fn()
      dropzone().addEventListener('failed.bs.dropzone', failed)

      instance.addFiles([createFile('a.txt')])
      FakeXhr.instances[0].respond(500)

      expect(items()[0].classList.contains('dropzone-item-error')).toBe(true)
      expect(items()[0].querySelector('.dropzone-item-meta')!.textContent).toBe('Upload failed')
      expect(failed).toHaveBeenCalledTimes(1)

      instance.upload()
      expect(FakeXhr.instances).toHaveLength(2)
      expect(items()[0].classList.contains('dropzone-item-uploading')).toBe(true)
      expect(items()[0].querySelector('.dropzone-item-meta')!.textContent).toBe('3 B')
    })

    it('should wait for upload() when autoUpload is off', () => {
      const instance = new Dropzone(dropzone(), { url: '/upload', autoUpload: false })
      instance.addFiles([createFile('a.txt')])
      expect(FakeXhr.instances).toHaveLength(0)

      instance.upload()
      expect(FakeXhr.instances).toHaveLength(1)
      expect(FakeXhr.instances[0].body).not.toBeNull()
    })

    it('should not send when the upload event is prevented', () => {
      const instance = new Dropzone(dropzone(), { url: '/upload' })
      dropzone().addEventListener('upload.bs.dropzone', (event) => event.preventDefault())

      instance.addFiles([createFile('a.txt')])
      expect(FakeXhr.instances[0].body).toBeNull()
    })

    it('should abort the request of a removed file', () => {
      const instance = new Dropzone(dropzone(), { url: '/upload' })
      const file = createFile('a.txt')
      instance.addFiles([file])
      instance.removeFile(file)

      expect(FakeXhr.instances[0].aborted).toBe(true)
      expect(items()).toHaveLength(0)
    })
  })

  describe('dispose', () => {
    it('should remove the list and stop listening', () => {
      const instance = new Dropzone(dropzone())
      instance.addFiles([createFile('a.txt')])
      instance.dispose()

      expect(dropzone().querySelector('.dropzone-list')).toBeNull()
      expect(Dropzone.getInstance(dropzone())).toBeNull()
    })
  })
})
