import Browser, { Runtime } from "webextension-polyfill";
import { ResponseMessage } from "../../shared";

interface Message {
  context: string;
}

function handleMessage(
  message: Message,
  _sender: Runtime.MessageSender,
  _sendResponse: Function,
) {
  if (message.context === "context") {
    throw new Error("Message sent from context");
  }

  const title: string =
    document.querySelector<HTMLTitleElement>("head > title")?.textContent!;

  const descriptionElm: HTMLMetaElement | null =
    document.querySelector("head > meta[name='description']") ??
    document.querySelector("head > meta[property='og:description']");

  const description: string | undefined = descriptionElm?.content;

  const imageElm: HTMLMetaElement | null = document.querySelector(
    "head > meta[property='og:image']",
  );

  const image = imageElm?.content;

  const response: ResponseMessage = { title, description, image };
  return Promise.resolve(response);
}

Browser.runtime.onMessage.addListener(handleMessage);
