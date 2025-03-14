import React from 'react';

function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                {/* Username */}
                <label className="input input-bordered flex items-center gap-2 w-full mb-3">
                    <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input 
                        type="text" 
                        required 
                        placeholder="Username" 
                        pattern="[A-Za-z][A-Za-z0-9\-]*" 
                        minLength="3" 
                        maxLength="30" 
                        title="Only letters, numbers, or dash" 
                        className="w-full bg-transparent focus:outline-none"
                    />
                </label>

                {/* Password */}
                <label className="input input-bordered flex items-center gap-2 w-full mb-3">
                    <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input 
                        type="password" 
                        required 
                        placeholder="Password" 
                        minLength="8" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
                        className="w-full bg-transparent focus:outline-none"
                    />
                </label>

                {/* Login Button */}
                <button className="btn btn-neutral w-full mt-4">Login</button>
                
                {/* Lien d'inscription */}
                <div className="text-center mt-4">
                    <p className="text-sm">
                        Pas encore de compte ?{" Inscrit toi "}
                        
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;