import QRCode from "react-qr-code";

export default function QrCode({ size, value, ...rest }) {
  return <QRCode {...rest} size={size} value={value} />;
}
