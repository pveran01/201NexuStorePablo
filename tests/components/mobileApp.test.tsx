import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import { MobileApp } from "../../components/MobileApp";
import MApp from "../../components/MobileApp";
import { MAppProps } from "../../components/MobileApp";

describe('Container for displaying apps', () => {
    const sampleApp: MobileApp = 
    // Define your MobileApp objects here
    // For example:
    
    { _id: "1", name: 'App 1', developer: 'test dev 1', image: "test image 1", reviews: 2.4, ratingTotal: 2.4, rating: 3.4, popularity: 2.3, description: "test des", comments: [], platforms: [] }
    // Add more objects as needed
    ;

    const props: MAppProps = {
        app: sampleApp,
    }

    

    screen.debug();

    //console.log(container.innerHTML);

    it("Should show apps name", () => {  
        const {container} = render(<MApp {...props}/>);     
        const appName = "App 1";
        let reference = screen.getByText(appName);
        expect(reference).toBeInTheDocument();
    });

    /*it("Should show apps image", () => {       
        const appImage = "test image 1";
        const reference = screen.getByAltText("App Image");
        expect(reference).toHaveAttribute('src', appImage);
    });*/

    it("Should show apps developer", () => {   
        const {container} = render(<MApp {...props}/>);    
        const developerName = "test dev 1";
        let reference = screen.getByText(developerName)
        expect(reference).toBeInTheDocument();
    });

    it("Should show apps description", () => { 
        const {container} = render(<MApp {...props}/>);      
        const description = "test des";
        let reference = screen.getByText(description, {exact: false});
        expect(reference).toBeInTheDocument();
    });

    it("Should show apps rating", () => {    
        const {container} = render(<MApp {...props}/>);   
        const rating = "3.4";
        let reference = screen.getByText(rating);
        expect(reference).toBeInTheDocument();
    });
})