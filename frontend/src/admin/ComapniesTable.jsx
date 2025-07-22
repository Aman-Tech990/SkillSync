import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetAllCompanies from '@/hooks/useGetAllCompaies';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ComapniesTable = () => {
    useGetAllCompanies();
    const { allCompanies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(allCompanies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = allCompanies.length > 0 && allCompanies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [allCompanies, searchCompanyByText]);

    return (
        <div>
            <Table>
                <TableCaption>List of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        (!allCompanies || allCompanies.length <= 0) ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    You have not registered any company yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompany.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage
                                                src={company.logo || 'default-logo.png'}
                                                className='object-contain'
                                            />
                                            <AvatarFallback>{company.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company?.name}</TableCell>
                                    <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div
                                                    onClick={() => navigate(`/admin/companies/create/${company?._id}`)}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4" />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default ComapniesTable;