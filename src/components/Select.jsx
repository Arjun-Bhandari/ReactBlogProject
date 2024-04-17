import React,{useId} from 'react'

 function Select({
    options,
    label,
    clssName,
    ...props

},ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className={`px-3 py-2 rouneded-lg bg-whtite text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${clssName}`}></label>}
            <select
            {...props}
            id = {id}
            ref={ref}>
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default React.forwardRef(Select)