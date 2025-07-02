import React from "react";

export default function Footer() {
    return (
        <footer className='text-center text-sm text-gray-500 mt-8'>
            <p>
                Laget med 🩷 av Andreas Takvam, med god hjelp fra{" "}
                <a
                    href='https://github.com/date-fns/date-fns'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                >
                    {" "}
                    date-fns{" "}
                </a>
                og{" "}
                <a
                    href='https://github.com/commenthol/date-holidays'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                >
                    date-holidays
                </a>
            </p>
            <small>
                © {new Date().getFullYear()} - Kalenderen er åpen kildekode
                <a
                    href='https://github.com/Andreastak86'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                >
                    <br />
                    Besøk min Github
                </a>
            </small>
        </footer>
    );
}
