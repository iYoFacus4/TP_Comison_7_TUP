import { Alert } from "react-bootstrap";

export default function AlertMessage({ type = "info", text }) {
  if (!text) return null;
  return (
    <Alert variant={type} className="mt-2">
      {text}
    </Alert>
  );
}
