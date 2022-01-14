import { useState } from 'react'
import textareaStyles from './TextArea.module.css'

type Props = {
  name: string
  label: string
  placeholder: string
  icon?: any
  rows?: number
  value: string
  onChange: (value: string) => void
}

const TextArea = ({
  name,
  icon,
  label,
  placeholder,
  value = '',
  rows = 6,
  onChange,
}: Props) => {
  const [text, setText] = useState(value)
  const withIcon = icon !== undefined
  const onChangeHandler = (event) => {
    setText(event.target.value)
    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }
  return (
    <div
      className={`${textareaStyles.textAreaContainer} ${
        withIcon ? textareaStyles.withIcon : ''
      }`}
    >
      <label className={textareaStyles.label} htmlFor={name}>
        {label}:
      </label>
      <div className="relative">
        {withIcon ? (
          <div className={textareaStyles.iconWrapper}>{icon}</div>
        ) : (
          ''
        )}
        <textarea
          className={textareaStyles.textarea}
          name={name}
          placeholder={placeholder}
          onChange={onChangeHandler}
          value={text}
          rows={rows}
        />
      </div>
    </div>
  )
}

export default TextArea
