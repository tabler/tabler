'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

function getFullscreenElement() {
  const _document = window.document

  const fullscreenElement =
    _document.fullscreenElement

  return fullscreenElement
}

async function exitFullscreen() {
  const _document = window.document

  if (typeof _document.exitFullscreen === 'function') return _document.exitFullscreen()

  return null
}

async function enterFullScreen(element) {
  const _element = element

  return (
    _element.requestFullscreen?.()
  )
}

const prefixes = ['', 'webkit', 'moz', 'ms']

function addEvents(element, { onFullScreen, onError }) {
  prefixes.forEach(prefix => {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen)
    element.addEventListener(`${prefix}fullscreenerror`, onError)
  })

  return () => {
    prefixes.forEach(prefix => {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen)
      element.removeEventListener(`${prefix}fullscreenerror`, onError)
    })
  }
}

export default function useFullscreen() {
  const [fullscreen, setFullscreen] = useState(false)

  const _ref = useRef<HTMLElement>()

  const handleFullscreenChange = useCallback(
    event => {
      setFullscreen(event.target === getFullscreenElement())
    },
    [setFullscreen]
  )

  const handleFullscreenError = useCallback(
    () => {
      setFullscreen(false)
    },
    [setFullscreen]
  )

  const toggle = useCallback(async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen(_ref.current)
    } else {
      await exitFullscreen()
    }
  }, [])

  const ref = useCallback(element => {
    if (element === null) {
      _ref.current = window.document.documentElement
    } else {
      _ref.current = element
    }
  }, [])

  useEffect(
    () => {
      if (!_ref.current && window.document) {
        _ref.current = window.document.documentElement
        return addEvents(_ref.current, {
          onFullScreen: handleFullscreenChange,
          onError: handleFullscreenError
        })
      }

      if (_ref.current) {
        return addEvents(_ref.current, {
          onFullScreen: handleFullscreenChange,
          onError: handleFullscreenError
        })
      }

      return undefined
    },
    [handleFullscreenChange, handleFullscreenError]
  )

  return { ref, toggle, fullscreen }
}
