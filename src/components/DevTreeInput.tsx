import { Switch } from "@headlessui/react"
import type { DevTreeLink } from "../types"
import { classNames } from "../utils"

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
}

export const DevTreeInput = ({ item, handleUrlChange, handleEnableLink }: DevTreeInputProps ) => {
    return (
        <div className="bg-white shadow-sm p-5 flex items-center gap-4 rounded">
            
            <div
                className="w-12 h-12 bg-cover rounded-full overflow-hidden"
                style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
            ></div>

            
            <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 w-[80%]"
                placeholder="https://www.example.com/your-link"
                value={item.url}
                onChange={handleUrlChange}
                name={item.name}
            />

            <Switch
                checked={item.enabled}
                onChange={() => handleEnableLink(item.name)}
                className={classNames(
                    item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>

        </div>
    );
};