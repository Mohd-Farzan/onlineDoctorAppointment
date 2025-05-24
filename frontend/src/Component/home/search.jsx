import { MapPin, SearchIcon } from "lucide-react"

export function Search() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex">
          <div className="relative flex-1">
            <div className="flex items-center border rounded-l px-4 h-12">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Kanpur" className="ml-2 w-full focus:outline-none" />
            </div>
          </div>
          <div className="relative flex-[2]">
            <div className="flex items-center border-t border-r border-b rounded-r px-4 h-12">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, clinics, hospitals, etc."
                className="ml-2 w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm">
          <span className="text-gray-600">Fed up of endless wait?</span>
          <span className="ml-2">Look for clinic with</span>
          <span className="ml-1 text-primary font-medium">Prime ✨</span>
        </div>
      </div>
    </div>
  )
}

