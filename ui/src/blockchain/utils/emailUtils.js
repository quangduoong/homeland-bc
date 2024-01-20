import Enum from "enum";
import emailjs from "@emailjs/browser";

export async function sendEmail(templateId, payload) {
  try {
    await emailjs.send(
      "service_8m1jw59",
      templateId.value,
      payload,
      "yPPXxKqc9d8S5om64"
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const templates = new Enum({
  deposit_changes: "template_fd2d6si",
  deposit_confirmed: "template_9obsmfv",
});
