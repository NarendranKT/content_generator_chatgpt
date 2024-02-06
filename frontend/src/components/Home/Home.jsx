import React from "react";
import ai from '../../assets/ai.png';
import { Link } from "react-router-dom";
import HomeFeatures from "./HomeFeatures";
import FreeTrial from "./FreeTrial";



const Home = () => {
    return (
        <>
            <div className="bg-gray-900 transition-all duration-200 ease-in">
                <div className="relative isolate overflow-hidden pt-14 px-5">
                <img
                    src={ai}
                    alt=" ai"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-black bg-opacity-90"></div>
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                        Announcing AI Content Generator full release
                        <Link className="font-semibold text-white ps-3">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Read more <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                    </div>
                    <div className="text-center">
                    <h1 className="md:text-5xl text-xl font-bold tracking-tight text-white sm:text-6xl">
                        AI Content Generator
                    </h1>
                    <p className="mt-6 text-sm md:text-lg leading-8 text-gray-300">
                        This is a content generator that uses AI to generate content
                        for you. It is a tool that helps you generate content for your
                        blog, website, or social media.
                    </p>
                    <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
                        <div class="mb-5 md:mb-0 relative inline-flex group">
                            <div
                                className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-l from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-[10px] group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200 animate-pulse">
                            </div>
                            <Link className="relative inline-flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-200 bg-gray-800/50 font-pj rounded-full focus:outline-none backdrop-blur-3xl  hover:bg-gray-800/85 border-[0.5px]" to='/free-plan'>
                                Start free 3 days trail
                            </Link>
                        </div>
                        
                        <Link
                        to="/free-plan"
                        className="text-sm font-semibold leading-6 text-white"
                        >
                        Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    />
                </div>
                </div>
            </div>
             {/* Homepage features */}
            <HomeFeatures />
            {/* Homepage CTA */}
            <FreeTrial />
        </>
    );
};

export default Home;
