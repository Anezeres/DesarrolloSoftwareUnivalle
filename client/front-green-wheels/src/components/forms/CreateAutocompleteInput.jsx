import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const CreateAutocompleteInput = ({label, options, searchKeys, showKey, onSelectAction}) => {
    
    const onSelectOption = (item) => {
        onSelectAction(item)
    };
    
    const formatResult = (item) => {
        return <p>{item.name}</p>
    };


    return (
    <>
        <label htmlFor="seller">{label}</label>
        <ReactSearchAutocomplete
            items={options}
            onSearch={()=>{}}
            onHover={()=>{}}
            onSelect={onSelectOption}
            onFocus={()=>{}}
            autoFocus
            formatResult={formatResult}
            fuseOptions={{ keys: searchKeys}}
            resultStringKeyName={showKey}
        />
    </>
    );
    
}