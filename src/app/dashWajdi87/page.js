"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dash() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://server-assurance.onrender.com/users");

                // Vérifie si la réponse contient 'users'
                const fetchedUsers = res.data.users || res.data;

                // Trie par date de création décroissante
                const sortedUsers = fetchedUsers.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setUsers(sortedUsers);
            } catch (err) {
                console.error(err);
                setError("Impossible de récupérer les utilisateurs.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p className="p-8 text-gray-700">Chargement des utilisateurs...</p>;
    if (error) return <p className="p-8 text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Liste des utilisateurs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Nom</th>
                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Prénom</th>
                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Adresse</th>
                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Téléphone</th>
                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Date création</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                                        Aucun utilisateur trouvé
                                    </td>
                                </tr>
                            ) : (

                                users.map((u, idx) => (
                                    <tr
                                        key={u._id || idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 transition-colors duration-200`}
                                    >
                                        <td className="px-4 py-2">{u.lastName}</td>
                                        <td className="px-4 py-2">{u.firstName}</td>
                                        <td className="px-4 py-2">{u.adresse}</td>
                                        <td className="px-4 py-2">{u.phone}</td>
                                        <td className="px-4 py-2">
                                            {new Date(u.createdAt).toLocaleDateString("fr-FR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
