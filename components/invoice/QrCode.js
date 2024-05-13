import QRCode from "qrcode.react";

export default function QrCode({ size, value, ...rest }) {
  return <QRCode {...rest} size={size} value={value} />;
}
