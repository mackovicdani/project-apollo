export default interface Notification {
  type: "succes" | "error" | "info" | "warrning";
  title: string;
  desc: string;
  index?: string;
}
