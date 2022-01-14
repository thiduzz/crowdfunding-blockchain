import buttonStyles from './Button.module.css'

type Props = {
  appearance?: 'default' | 'cta'
  children?: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

const Button = ({ appearance = 'default', children, onClick }: Props) => (
  <button
    onClick={onClick}
    className={`${buttonStyles.button} ${buttonStyles[appearance]}`}
    type="button"
  >
    {children}
  </button>
)

export default Button
