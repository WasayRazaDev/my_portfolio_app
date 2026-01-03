import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function usePortfolioData() {
    const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const [{ data: profile }] = await Promise.all([
                supabase.from("profile").select("*").single()
            ]);

            const { data: services } = await supabase.from("services").select("*");
            const { data: projects } = await supabase
                .from("projects")
                .select("*")
                .order("index");

            const { data: skills } = await supabase.from("skills").select("*");
            const { data: contact } = await supabase.from("contact").select("*").single();

            setPortfolioData({
                profile: {
                    name: profile.name,
                    role: profile.role,
                    cv: profile.cv,
                    photo: profile.photo,
                    stats: {
                        exp: profile.exp,
                        projects: profile.projects,
                        clients: profile.clients
                    },
                    socials: {
                        github: "https://github.com",
                        linkedin: "https://linkedin.com",
                        instagram: "https://instagram.com",
                        facebook: "https://facebook.com"
                    }
                },
                services,
                about: {
                    description: profile.description,
                    skills
                },
                projects,
                contact
            });

        };

        loadData();
    }, []);

    return { portfolioData };
}
