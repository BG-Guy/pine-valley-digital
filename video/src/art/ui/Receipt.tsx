// The paid invoice: two lines and a total, which stamps in when the job is
// done, and a lemon "Paid" starburst that lands on its corner a beat later.
import './ui.css'
import type { CSSProperties } from 'react'
import { Burst } from '../../components/burst/Burst'
import { color } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'

type ReceiptProps = {
  frame: number
  // The frame the invoice appears; the starburst follows two frames later.
  at: number
  style?: CSSProperties
}

export const Receipt: React.FC<ReceiptProps> = ({ frame, at, style }) => {
  const paidAt = at + 2

  return (
    <div className="ui-receipt" style={{ ...style, scale: String(pop(frame, at)) }}>
      <div className="mono ui-receipt-id">Invoice #1042</div>
      <div className="ui-receipt-line">
        <span>Call-out</span>
        <span>$90</span>
      </div>
      <div className="ui-receipt-line">
        <span>Pipe repair</span>
        <span>$150</span>
      </div>
      <div className="display ui-receipt-total">
        <span>Total</span>
        <span>$240</span>
      </div>
      <div className="ui-receipt-paid" style={{ scale: String(pop(frame, paidAt)), rotate: `${frame < paidAt ? 0 : keyed(frame, paidAt, [26, 8, 15, 12])}deg` }}>
        <Burst size={170} fill={color.lemon} big="Paid" bigSize={33} />
      </div>
    </div>
  )
}
