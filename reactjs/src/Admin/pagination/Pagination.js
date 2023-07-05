import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cx = classNames.bind(styles);


const Pagination = ({ data, pageSize, setCurrentData }) => {
    const totalRecords = data.length; 
    const totalPages = Math.ceil(totalRecords / pageSize); // Tổng số trang

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    let startIndex = (currentPage - 1) * pageSize; // Bắt đầu từ index
    let endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1); // Kết thúc tại index

    // Cập nhật lại startIndex và endIndex khi dữ liệu thay đổi
    useEffect(() => {
        startIndex = (currentPage - 1) * pageSize;
        endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1);
        const currentData = data.slice(startIndex, endIndex + 1);
        setCurrentData(currentData);
    }, [currentPage, data, pageSize, setCurrentData, totalRecords]);

    // Xử lý khi nhấn nút trang trước
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Xử lý khi nhấn nút trang tiếp theo
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className={cx("pagination-container")}>
                <span className={cx("pagination-info")}>
                    Showing {startIndex +1} to {endIndex + 1 } of {totalRecords} records
                </span>

                <div className={cx("pagination-buttons")}>
                    <button
                        className={cx("pagination-button")}
                        disabled={currentPage === 1}
                        onClick={goToPreviousPage}
                    >
                        Prev
                    </button>
                    <button
                        className={cx("pagination-button")}
                        disabled={currentPage === totalPages}
                        onClick={goToNextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Pagination;
