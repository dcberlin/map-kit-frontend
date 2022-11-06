import { EmojiSadIcon } from "@heroicons/react/solid";

interface ErrorScreenProps {
  message?: string;
}

export default function ErrorScreen({message}: ErrorScreenProps) {
  return (
    <div className="fixed h-full w-full top-0 left-0 bg-white opacity-70 z-50">
      <div className="flex h-full w-full items-center justify-center" title={message}>
        <EmojiSadIcon className="w-8 h-8 text-red-600" />
      </div>
    </div>
  );
}
