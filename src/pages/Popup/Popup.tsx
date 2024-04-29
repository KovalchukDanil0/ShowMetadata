import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import Browser, { Tabs } from "webextension-polyfill";
import { ResponseMessage } from "../../shared";
import "./Popup.css";

let metaFromPage: ResponseMessage;

export default function Popup(): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);

  async function getMeta() {
    const tab: Tabs.Tab = (
      await Browser.tabs.query({ active: true, currentWindow: true })
    )[0];
    metaFromPage = await Browser.tabs.sendMessage(tab.id!, {
      context: "popup",
    });

    setIsLoaded(true);
  }

  if (!isLoaded) {
    getMeta();
    return (
      <center className="my-12">
        <Spinner />
        <p className="mt-2">Loading...</p>
      </center>
    );
  }

  return (
    <div className="mx-3 my-3 flex flex-col gap-2">
      <h2 className="font-bold">{metaFromPage.title}</h2>
      {metaFromPage.description && <h3>{metaFromPage.description}</h3>}
      {metaFromPage.image && <img src={metaFromPage.image} alt="MetaData" />}
    </div>
  );
}
