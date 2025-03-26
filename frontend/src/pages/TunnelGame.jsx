import React from 'react';

const TunnelGame = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Tunnel Game</h1>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: '100px',
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid black',
                            borderRadius: '5px',
                        }}
                    >
                        <h3>Box {index + 1}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TunnelGame;