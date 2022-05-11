import { ReactNode, useState, useRef, useEffect } from 'react'
import styles from './Dropdown.module.scss'
import FadeIn from '../../util/FadeIn'

type AlignmentT = 'left' | 'right'
type DropdownProps = {
  cta: ReactNode,
  content: ReactNode,
  classProp?: string,
  alignment?: AlignmentT
}

const Dropdown = ({ cta, content, classProp = '', alignment }: DropdownProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If open and target not in component, close component.
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [isOpen])

  const handleOpen = () => {
    setIsVisible((state) => !state)
    setIsOpen((state) => !state)
  }

  const handleClose = () => {
    setIsOpen((state) => !state)
  }

  const handleOnComplete = () => {
    if (!isOpen) setIsVisible(false)
  }

  return (
    <div ref={ref} className={`${classProp} ${styles.dropdown_wrapper}`}>
      {/* CTA */}
      <div onClick={isVisible ? handleClose : handleOpen}>
        {cta}
      </div>

      {/* Dropdown Custom Content */}
      <FadeIn isVisible={isOpen} onComplete={handleOnComplete}>
        {isVisible && (
          <div className={`${styles.content_wrapper} ${alignment === 'right' ? 'u-right-absolute' : 'u-left-absolute'}`}>
            {content}
          </div>
        )}
      </FadeIn>

    </div>
  )
}

export default Dropdown