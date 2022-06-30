import { EmojiSadIcon } from "@heroicons/react/solid";

export default function ErrorScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <EmojiSadIcon className="w-8 h-8 text-red-400" />
    </div>
  );
}
