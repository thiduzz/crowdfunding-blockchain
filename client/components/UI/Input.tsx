import { useState } from 'react'
import { InputType } from 'zlib'
import inputStyles from './Input.module.css'

type Props = {
  name: string
  label: string
  placeholder?: string
  icon?: any
  value: string
  onChange: (value: string) => void
  type?: string
}

const Input = ({
  type = 'text',
  name,
  icon,
  label,
  placeholder = '',
  value = '',
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
      className={`${inputStyles.inputContainer} ${
        withIcon ? inputStyles.withIcon : ''
      }`}
    >
      <label className={inputStyles.label} htmlFor={name}>
        {label}:
      </label>
      <div className="relative">
        {withIcon ? <div className={inputStyles.iconWrapper}>{icon}</div> : ''}
        <input
          className={inputStyles.input}
          type={type}
          name={name}
          value={text}
          placeholder={placeholder}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </div>
    </div>
  )
}

export default Input
