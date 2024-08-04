import React, { useState } from 'react'
import { StoreType } from '../../queries/getStores';
import { Link } from '@tanstack/react-router';

export default function StoreCard({ store }: { store: StoreType }) {

    const [isFavorite, setIsFavorite] = useState(false);



    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        // window.location.href = store.homepage;
    };

    const getCashbackDisplay = () => {
        if (store.cashback_enabled === 0) {
            return 'No cashback available';
        }

        const rateType = store.rate_type === 'upto' ? 'Upto' : 'Flat';
        const amountType = store.amount_type === 'fixed' ? '$' : '%';
        const cashbackAmount = store.cashback_amount.toFixed(2);

        return `${rateType} ${amountType === '$' ? amountType + cashbackAmount : cashbackAmount + amountType} cashback`;
    };

    return (
        <Link to={`${store.homepage}`} target='_blank' className="border rounded-lg overflow-hidden cursor-pointer  duration-200 relative p-4 hover:shadow-xl" >
            <div className="flex justify-between items-center">
                <img src={store.logo} alt={`${store.name} logo`} className="h-16 w-16 object-contain mx-auto" />
                <button
                    className={`absolute top-4 right-4 text-xl ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? '❤️' : '♡'}
                </button>
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold">{store.name}</h2>
                <p className="text-gray-600 mt-2">{getCashbackDisplay()}</p>
            </div>
        </Link>
    )
}
