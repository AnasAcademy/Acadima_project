export default function UserMessage({ name = "User Name", message }) {
  return (
    <div className="d-flex flex-column justify-content-start align-items-start  w-75">
      <small className="text-muted d-block mb-1">{name}</small>
      <span className="bubble user-bubble text-black">{message}</span>
    </div>
  );
}
