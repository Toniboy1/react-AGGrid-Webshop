import { searchPositionCatalog } from "@/services/positions";
import { useCallback, useRef, useState, FocusEvent } from "react"

export const useSearchPosition = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])
    const onChange = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            searchPositionCatalog(query)
                .then(res => {
                    console.log(res.data)
                    setResults(res.data)
                })
        } else {
            setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event : MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, []);

    return { query, active, results, onChange, onFocus, searchRef }
}