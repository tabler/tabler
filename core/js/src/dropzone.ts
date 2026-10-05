/**
 * --------------------------------------------------------------------------
 * Bootstrap dropzone.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  accept: string | null
  autoUpload: boolean
  headers: Record<string, string> | null
  maxFiles: number | null
  maxSize: number | null
  method: string
  paramName: string | null
  textFailed: string
  textInvalidType: string
  textRemove: string
  textTooLarge: string
  textTooMany: string
  url: string | null
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

type RejectReason = 'type' | 'size' | 'count'

type ItemStatus = 'ready' | 'uploading' | 'success' | 'error' | 'rejected'

type DropzoneItem = {
  element: HTMLElement
  file: File
  meta: HTMLElement
  progress: HTMLElement | null
  status: ItemStatus
  xhr: XMLHttpRequest | null
}

/**
 * Constants
 */

const NAME = 'dropzone'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_ADD = `add${EVENT_KEY}`
const EVENT_ADDED = `added${EVENT_KEY}`
const EVENT_REMOVED = `removed${EVENT_KEY}`
const EVENT_REJECTED = `rejected${EVENT_KEY}`
const EVENT_UPLOAD = `upload${EVENT_KEY}`
const EVENT_PROGRESS = `progress${EVENT_KEY}`
const EVENT_UPLOADED = `uploaded${EVENT_KEY}`
const EVENT_FAILED = `failed${EVENT_KEY}`

const CLASS_NAME_DRAGOVER = 'dropzone-dragover'
const CLASS_NAME_LIST = 'dropzone-list'
const CLASS_NAME_ITEM = 'dropzone-item'
const CLASS_NAME_ITEM_BODY = 'dropzone-item-body'
const CLASS_NAME_ITEM_NAME = 'dropzone-item-name'
const CLASS_NAME_ITEM_META = 'dropzone-item-meta'
const CLASS_NAME_ITEM_REMOVE = 'dropzone-item-remove'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropzone"], [data-tblr-toggle="dropzone"]'
const SELECTOR_INPUT = 'input[type="file"]'
const SELECTOR_LIST = `.${CLASS_NAME_LIST}`
const SELECTOR_ITEM_REMOVE = `.${CLASS_NAME_ITEM_REMOVE}`

// The port's `EventHandler` does not know the drag events as native ones
const DRAG_OVER_EVENTS = ['dragenter', 'dragover']

const SIZE_UNITS = ['B', 'kB', 'MB', 'GB']

const Default: ComponentConfig = {
  accept: null,
  autoUpload: true,
  headers: null,
  maxFiles: null,
  maxSize: null,
  method: 'post',
  paramName: null,
  textFailed: 'Upload failed',
  textInvalidType: 'This file type is not allowed',
  textRemove: 'Remove file',
  textTooLarge: 'File is too large (max {size})',
  textTooMany: 'Too many files (max {count})',
  url: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  accept: '(string|null)',
  autoUpload: 'boolean',
  headers: '(object|null)',
  maxFiles: '(number|null)',
  maxSize: '(number|null)',
  method: 'string',
  paramName: '(string|null)',
  textFailed: 'string',
  textInvalidType: 'string',
  textRemove: 'string',
  textTooLarge: 'string',
  textTooMany: 'string',
  url: '(string|null)',
}

const formatSize = (bytes: number): string => {
  let value = bytes
  let unit = 0

  while (value >= 1024 && unit < SIZE_UNITS.length - 1) {
    value /= 1024
    unit++
  }

  return `${unit ? Number(value.toFixed(1)) : value} ${SIZE_UNITS[unit]}`
}

// Same rules as the native `accept` attribute: `.ext`, `type/*` or a full MIME type
const matchesAccept = (file: File, accept: string): boolean => {
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  const tokens = accept
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)

  return (
    tokens.length === 0 ||
    tokens.some((token) => {
      if (token.startsWith('.')) {
        return name.endsWith(token)
      }

      return token.endsWith('/*') ? type.startsWith(token.slice(0, -1)) : type === token
    })
  )
}

const createElement = (className: string, tag = 'div'): HTMLElement => {
  const element = document.createElement(tag)
  element.className = className
  return element
}

/**
 * Class definition
 *
 * The real `<input type="file">` inside `.dropzone` stays the source of truth:
 * without the `url` option the chosen files are written back to it, so they
 * are sent with an ordinary form submit. With `url` every file is uploaded on
 * its own and the input is kept empty.
 */

class Dropzone extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _input!: HTMLInputElement
  _list!: HTMLElement
  _ownsList = false
  _items: DropzoneItem[] = []

  _onChange = (): void => {
    this.addFiles(this._input.files ?? [])
  }
  _onDragOver = (event: Event): void => {
    if (this._isFileDrag(event as DragEvent)) {
      event.preventDefault()
      this._element.classList.add(CLASS_NAME_DRAGOVER)
    }
  }
  _onDragLeave = (event: Event): void => {
    if (!this._element.contains((event as DragEvent).relatedTarget as Node | null)) {
      this._element.classList.remove(CLASS_NAME_DRAGOVER)
    }
  }
  _onDrop = (event: Event): void => {
    const { dataTransfer } = event as DragEvent
    if (!dataTransfer || !this._isFileDrag(event as DragEvent)) {
      return
    }

    event.preventDefault()
    this._element.classList.remove(CLASS_NAME_DRAGOVER)
    this.addFiles(dataTransfer.files)
  }
  _onListClick = (event: Event): void => {
    const button = (event.target as Element).closest(SELECTOR_ITEM_REMOVE)
    const item = button && this._items.find(({ element }) => element.contains(button))
    if (item) {
      this._removeItem(item)
      this._sync()
    }
  }
  _onReset = (): void => this.clear()

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    const input = SelectorEngine.findOne(SELECTOR_INPUT, this._element) as HTMLInputElement | null
    if (!input) {
      return
    }

    this._input = input

    const list = SelectorEngine.findOne(SELECTOR_LIST, this._element)
    this._ownsList = !list
    this._list = list ?? createElement(CLASS_NAME_LIST)
    if (!list) {
      this._list.setAttribute('aria-live', 'polite')
      this._element.append(this._list)
    }

    this._addEventListeners()
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  // Public
  getFiles(): File[] {
    return this._items.filter(({ status }) => status !== 'rejected').map(({ file }) => file)
  }

  addFiles(files: Iterable<File> | ArrayLike<File>): void {
    let incoming = Array.from(files)

    // Like the native input, a single-file dropzone replaces its file
    if (!this._input.multiple) {
      incoming = incoming.slice(0, 1)
      if (incoming.length > 0) {
        this._removeAll()
      }
    }

    const added: DropzoneItem[] = []

    for (const file of incoming) {
      const reason = this._validate(file)

      if (!reason && EventHandler.trigger(this._element, EVENT_ADD, { file })?.defaultPrevented) {
        continue
      }

      const item = this._createItem(file, reason)
      this._items.push(item)
      this._list.append(item.element)

      if (reason) {
        EventHandler.trigger(this._element, EVENT_REJECTED, { file, reason })
      } else {
        added.push(item)
        EventHandler.trigger(this._element, EVENT_ADDED, { file })
      }
    }

    this._sync()

    if (this._config.url && this._config.autoUpload) {
      for (const item of added) {
        this._upload(item)
      }
    }
  }

  removeFile(file: File): void {
    const item = this._items.find((candidate) => candidate.file === file)
    if (item) {
      this._removeItem(item)
      this._sync()
    }
  }

  clear(): void {
    this._removeAll()
    this._sync()
  }

  upload(): void {
    if (!this._config.url) {
      return
    }

    // A failed upload is sent again
    for (const item of this._items.filter(({ status }) => status === 'ready' || status === 'error')) {
      this._upload(item)
    }
  }

  dispose(): void {
    if (!this._input) {
      super.dispose()
      return
    }

    this._input.removeEventListener('change', this._onChange)
    this._input.form?.removeEventListener('reset', this._onReset)
    this._list.removeEventListener('click', this._onListClick)
    for (const type of DRAG_OVER_EVENTS) {
      this._element.removeEventListener(type, this._onDragOver)
    }
    this._element.removeEventListener('dragleave', this._onDragLeave)
    this._element.removeEventListener('drop', this._onDrop)

    for (const item of this._items) {
      this._destroyItem(item)
    }
    this._items = []

    if (this._ownsList) {
      this._list.remove()
    }

    this._element.classList.remove(CLASS_NAME_DRAGOVER)
    super.dispose()
  }

  // Private
  _addEventListeners(): void {
    this._input.addEventListener('change', this._onChange)
    this._input.form?.addEventListener('reset', this._onReset)
    this._list.addEventListener('click', this._onListClick)
    for (const type of DRAG_OVER_EVENTS) {
      this._element.addEventListener(type, this._onDragOver)
    }
    this._element.addEventListener('dragleave', this._onDragLeave)
    this._element.addEventListener('drop', this._onDrop)
  }

  _isFileDrag(event: DragEvent): boolean {
    return !this._input.disabled && Boolean(event.dataTransfer?.types.includes('Files'))
  }

  _validate(file: File): RejectReason | null {
    const { maxFiles, maxSize } = this._config
    const accept = this._config.accept ?? this._input.accept

    if (accept && !matchesAccept(file, accept)) {
      return 'type'
    }

    if (maxSize !== null && file.size > maxSize) {
      return 'size'
    }

    if (maxFiles !== null && this.getFiles().length >= maxFiles) {
      return 'count'
    }

    return null
  }

  _rejectText(reason: RejectReason): string {
    const { maxFiles, maxSize, textInvalidType, textTooLarge, textTooMany } = this._config

    if (reason === 'size') {
      return textTooLarge.replace('{size}', formatSize(maxSize ?? 0))
    }

    return reason === 'count' ? textTooMany.replace('{count}', String(maxFiles)) : textInvalidType
  }

  _createItem(file: File, reason: RejectReason | null): DropzoneItem {
    const element = createElement(CLASS_NAME_ITEM)
    const body = createElement(CLASS_NAME_ITEM_BODY)
    const name = createElement(CLASS_NAME_ITEM_NAME)
    const meta = createElement(CLASS_NAME_ITEM_META)
    const remove = createElement(`btn-close ${CLASS_NAME_ITEM_REMOVE}`, 'button')
    let progress: HTMLElement | null = null

    name.textContent = file.name
    meta.textContent = reason ? this._rejectText(reason) : formatSize(file.size)
    remove.setAttribute('type', 'button')
    remove.setAttribute('aria-label', this._config.textRemove)
    body.append(name, meta)

    if (this._config.url && !reason) {
      const track = createElement('progress progress-sm')
      progress = createElement('progress-bar')
      progress.setAttribute('role', 'progressbar')
      progress.setAttribute('aria-label', file.name)
      progress.setAttribute('aria-valuemin', '0')
      progress.setAttribute('aria-valuemax', '100')
      track.append(progress)
      body.append(track)
    }

    element.append(body, remove)

    const item: DropzoneItem = { element, file, meta, progress, status: 'ready', xhr: null }
    this._setStatus(item, reason ? 'rejected' : 'ready')
    this._setProgress(item, 0)
    return item
  }

  _setStatus(item: DropzoneItem, status: ItemStatus): void {
    item.status = status
    item.element.classList.toggle(`${CLASS_NAME_ITEM}-uploading`, status === 'uploading')
    item.element.classList.toggle(`${CLASS_NAME_ITEM}-success`, status === 'success')
    item.element.classList.toggle(`${CLASS_NAME_ITEM}-error`, status === 'error' || status === 'rejected')
  }

  _setProgress(item: DropzoneItem, value: number): void {
    if (item.progress) {
      item.progress.style.width = `${value}%`
      item.progress.setAttribute('aria-valuenow', String(Math.round(value)))
    }
  }

  _destroyItem(item: DropzoneItem): void {
    item.xhr?.abort()
    item.xhr = null

    item.element.remove()
  }

  _removeItem(item: DropzoneItem): void {
    this._destroyItem(item)
    this._items = this._items.filter((candidate) => candidate !== item)
    EventHandler.trigger(this._element, EVENT_REMOVED, { file: item.file })
  }

  _removeAll(): void {
    for (const item of [...this._items]) {
      this._removeItem(item)
    }
  }

  // Writes the accepted files back to the input, so a form submit sends them
  _sync(): void {
    if (this._config.url) {
      this._input.value = ''
      return
    }

    const transfer = new DataTransfer()
    for (const file of this.getFiles()) {
      transfer.items.add(file)
    }

    this._input.files = transfer.files
  }

  _upload(item: DropzoneItem): void {
    const { headers, method, paramName, url } = this._config
    if (!url) {
      return
    }

    const { file } = item
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append(paramName ?? (this._input.name || 'file'), file)

    xhr.open(method, url)
    for (const [header, value] of Object.entries(headers ?? {})) {
      xhr.setRequestHeader(header, value)
    }

    // The request is open but not sent: a listener can add fields or headers
    if (EventHandler.trigger(this._element, EVENT_UPLOAD, { file, formData, xhr })?.defaultPrevented) {
      return
    }

    const finish = (success: boolean): void => {
      item.xhr = null
      this._setStatus(item, success ? 'success' : 'error')

      if (success) {
        this._setProgress(item, 100)
      } else {
        item.meta.textContent = this._config.textFailed
      }

      EventHandler.trigger(this._element, success ? EVENT_UPLOADED : EVENT_FAILED, { file, xhr })
    }

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100
        this._setProgress(item, progress)
        EventHandler.trigger(this._element, EVENT_PROGRESS, { file, progress })
      }
    })
    xhr.addEventListener('load', () => finish(xhr.status >= 200 && xhr.status < 300))
    xhr.addEventListener('error', () => finish(false))

    item.xhr = xhr
    item.meta.textContent = formatSize(file.size)
    this._setProgress(item, 0)
    this._setStatus(item, 'uploading')
    xhr.send(formData)
  }
}

/**
 * Data API implementation
 */

// js-docs-start dropzone-init
initAll(SELECTOR_DATA_TOGGLE, Dropzone)
// js-docs-end dropzone-init

export default Dropzone
