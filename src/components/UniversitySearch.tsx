
import React, { useState, useEffect, useRef } from 'react';
import { Search, School } from 'lucide-react';
import { University, searchUniversities } from '@/data/universities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface UniversitySearchProps {
  onUniversitySelect: (university: University | null) => void;
  selectedUniversity: University | null;
}

const UniversitySearch = ({ onUniversitySelect, selectedUniversity }: UniversitySearchProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<University[]>([]);
  
  useEffect(() => {
    const fetchResults = () => {
      const searchResults = searchUniversities(query);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
    };
    
    fetchResults();
  }, [query]);
  
  const handleSelect = (university: University) => {
    setValue(university.name);
    onUniversitySelect(university);
    setOpen(false);
  };
  
  const clearSelection = () => {
    setValue("");
    onUniversitySelect(null);
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Find Hostels Near Universities</h3>
        {selectedUniversity && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelection}
            className="text-sm text-muted-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left bg-white"
          >
            <div className="flex items-center">
              <School className="mr-2 h-4 w-4 text-hostel-blue" />
              {selectedUniversity ? selectedUniversity.name : "Search for a university..."}
            </div>
            <Search className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search universities..." 
              value={query}
              onValueChange={setQuery}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No university found.</CommandEmpty>
              <CommandGroup>
                {results.map((university) => (
                  <CommandItem
                    key={university.id}
                    value={university.name}
                    onSelect={() => handleSelect(university)}
                  >
                    <School className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{university.name}</span>
                      <span className="text-xs text-muted-foreground">{university.location}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {selectedUniversity && (
        <div className="p-3 bg-hostel-lightBlue bg-opacity-10 rounded-md">
          <div className="flex items-start">
            <School className="mr-2 h-5 w-5 text-hostel-blue mt-0.5" />
            <div>
              <p className="font-medium">{selectedUniversity.name}</p>
              <p className="text-sm text-muted-foreground">{selectedUniversity.location}</p>
              <p className="text-sm mt-1">Showing hostels within 10km radius</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversitySearch;
