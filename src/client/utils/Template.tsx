import * as React from 'react';


class Template extends React.Component<ITemplateProps, ITemplateState>{
    constructor(props: ITemplateProps){
        super(props);
        this.state ={}
    }
    render(){
        return(
            <div className="text-center mt-5">Template Page</div>
        );
    }
}

interface ITemplateProps{};

interface ITemplateState{};


export default Template