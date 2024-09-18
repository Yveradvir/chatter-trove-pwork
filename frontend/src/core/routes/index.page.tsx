import Layout from "@core/components/layout";

const IndexPage = () => {
    return (
        <Layout>
            <div className="mx-auto max-w-2xl py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-cyan-300">
                        The Future of Online Discussion
                    </h1>
                    <p className="mt-4 text-lg leading-6 text-teal-300">
                        Welcome to ChatTrove, the next generation forum where conversations thrive. Whether you're
                        looking to share insights, ask questions, or connect with like-minded individuals, 
                        ChatTrove offers the perfect platform for open discussions in real-time.
                    </p>
                    <p className="mt-4 text-lg leading-6 text-teal-300">
                        Find your voice in a world where communities are empowered by knowledge, creativity, 
                        and collaboration. Start meaningful conversations today and watch your ideas grow.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-teal-300 px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                        >
                            Get started
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-cyan-300">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;
