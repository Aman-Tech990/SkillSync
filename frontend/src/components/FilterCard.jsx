import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterData: `Location`,
        array: [`Delhi NCR`, `Gurugram`, `Pune`, `Bangalore`, `Hyderabad`, `Bhubaneswar`]
    },
    {
        filterData: `Domain`,
        array: [`Frontend Developer`, `Backend Developer`, `Full Stack Developer`, `Data Science`, `AI Engineer`, `Graphic Designer`]
    },
    {
        filterData: `Salary`,
        array: [`0-40K`, `40-1Lakh`, `1Lakh - 5Lakh`, `5Lakh-12Lakh`, `12Lakh+`]
    }
]

const FilterCard = () => {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState("");

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr />
            <div className='mt-3'>
                <RadioGroup value={selectedValue} onValueChange={changeHandler} >
                    {
                        filterData.map((data, index) => (
                            <div>
                                <h1 className='font-bold text-lg'>{data.filterData}</h1>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `r${index} - ${idx}`;
                                        return (
                                            <div className='flex items-center space-x-2 my-2' >
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId} >{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </div >
        </div >
    )
}

export default FilterCard;