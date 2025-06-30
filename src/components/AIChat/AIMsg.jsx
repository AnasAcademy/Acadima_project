import HelpIcon from "@/assets/admin/helpIcon.svg";

export default function AiMessage({ name = "AI NAME", message }) {
  return (
    <div className="align-self-end d-flex flex-column justify-content-end align-items-end w-75">
      <div className="d-flex align-items-center justify-content-end gap-1 mb-1">
        <small className="text-muted">{name}</small>
        <HelpIcon className="iconSize2 iconcolor" />
      </div>
      <span className="bubble ai-bubble text-black">{message}</span>
    </div>
  );
}
