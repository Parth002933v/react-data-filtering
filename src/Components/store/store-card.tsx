import React, { useState, useEffect } from 'react';
import { StoreType } from '../../queries/getStores';
import { Link } from '@tanstack/react-router';

export default function StoreCard({ store }: { store: StoreType }) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const isFavoriteStore = localStorage.getItem(store.id.toString()) === store.id.toString();
        setIsFavorite(isFavoriteStore);
    }, [store.id]);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (!isFavorite) {
            localStorage.setItem(store.id.toString(), store.id.toString());
        } else {
            localStorage.removeItem(store.id.toString());
        }
        setIsFavorite(!isFavorite);
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
        <div className="border rounded-lg overflow-hidden duration-200 relative p-4 hover:shadow-xl">
            <div className="flex justify-between items-center">
                <img src={store.logo} alt={`${store.name} logo`} className="h-16 w-16 object-contain mx-auto" />
                <button
                    className={`absolute top-4 right-4 text-xl ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? '❤️' : '♡'}
                </button>
            </div>
            <Link to={store.homepage} target='_blank'>
                <div className="mt-4 text-center">
                    <h2 className="text-lg font-semibold">{store.name}</h2>
                    <p className="text-gray-600 mt-2">{getCashbackDisplay()}</p>
                </div>
            </Link>
        </div>
    );
}
