import React from 'react';
import "../styles/app.scss"; // Import the global styles for the loading spinner

export default function Loading() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Laster inn...</p>
        </div>
    );
}