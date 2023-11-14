import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe } from "node:test";



describe('Profile Page', () => {
    const sampleUser: UserData = 
        
        { _id: "1", username: 'test user', password: "test password", accessLevel: 0};
        
        // Add more objects as needed


    const props: userProps = {
        apps: sampleUser,
    }

    it('Should show user username', () => {

        render(<ProfilePage {...props} />);
        const userName = sampleUser.username;
        const reference = screen.findByText("userName");
        expect(reference).toBeInTheDocument();

    });

    it('Should show user accessLevel', () => {

        render(<ProfilePage {...props} />);
        if (sampleUser.accessLevel < 1) {
            const reference = screen.findByText("User");
            expect(reference).toBeInTheDocument();
        } else if (sampleUser.accessLevel < 2) {
            const reference = screen.findByText("Moderator");
            expect(reference).toBeInTheDocument();
        } else {
            const reference = screen.findByText("Administrator");
            expect(reference).toBeInTheDocument();
        }

    });

    it('Should show app submissions if admin', () => {

        render(<ProfilePage {...props} />);
        
        if (sampleUser.accessLevel > 1) {
            const reference = screen.findByText("Submitted Apps");
            expect(reference).toBeInTheDocument();
        } else {
            expect(screen.queryByText("Submited Apps")).toBeUndefined();
        }
        

    });
})