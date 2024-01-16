import { Menu } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";

const AboutMenu = () => {
  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(location.href);
  };
  return (
    <Menu>
      <Menu.Items className="flex flex-col">
        <Menu.Item disabled>
          <span className="text-slate-300 p-2">Block</span>
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && "bg-slate-100"} p-2`}
              onClick={copyToClipBoard}
            >
              Copy link
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
      <Menu.Button className="border-2 rounded-full p-3 hover:bg-slate-100">
        <BsThreeDots />
      </Menu.Button>
    </Menu>
  );
};

export default AboutMenu;
