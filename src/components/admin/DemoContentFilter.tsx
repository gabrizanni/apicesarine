import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

interface DemoContentFilterProps {
  onToggle: (includeDemos: boolean) => void;
  includeDemos: boolean;
}

export const DemoContentFilter = ({ onToggle, includeDemos }: DemoContentFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Load from localStorage on mount
    const savedPreference = localStorage.getItem('admin-include-demos');
    if (savedPreference !== null) {
      onToggle(savedPreference === 'true');
    }
    
    // Load from URL if present
    const urlParam = searchParams.get('includeDemos');
    if (urlParam !== null) {
      onToggle(urlParam === 'true');
    }
  }, []);

  const handleToggle = (checked: boolean) => {
    onToggle(checked);
    
    // Save to localStorage
    localStorage.setItem('admin-include-demos', checked.toString());
    
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set('includeDemos', checked.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="include-demos"
        checked={includeDemos}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="include-demos" className="text-sm font-medium">
        Includi contenuti demo
      </Label>
    </div>
  );
};
