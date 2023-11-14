import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "../../pages";
import { describe } from "node:test";
import { MobileApp } from "../../components/MobileApp";
import { Double } from "mongodb";
import { HomeProps } from "../../pages";



describe('Home Page', () => {
    it('Should render properly', () => {
        var Double = require("mongodb").Double;
        const sampleApps: MobileApp[] = [
            // Define your MobileApp objects here
            // For example:
            
            { _id: "1", name: 'App 1', developer: "test dev 1", image: "test image 1", reviews: 2.4, ratingTotal: 2.4, rating: 3.4, popularity: 2.3, description: "test des", comments: [], platforms: [] },
            { _id: "2", name: 'App 2', developer: "test dev 2", image: "test image 2", reviews: 2.4, ratingTotal: 2.4, rating: 3.4, popularity: 2.3, description: "test des 2", comments: [], platforms: [] },
            // Add more objects as needed
        ];

        const props: HomeProps = {
            apps: sampleApps,
        }

        render(<Home {...props} />);

        const navbar = screen.getByRole("navigation");
        expect(navbar).toBeInTheDocument();
    })
})