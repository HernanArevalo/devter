import AppLayout from "../../components/AppLayout";

export default function HomePage () {
    return (
        <AppLayout>
            <div>
                <header>
                <h2>Inicio</h2>
                </header>
                <section>

                </section>
                <nav>

                </nav>
            </div>

            <style jsx>{`
                div{
                    display: relative;
                }
                header{
                    height: 49px;
                    position: fixed;
                    display: flex;
                    align-items: center;
                    top: 0;
                    border-bottom: 1px solid #ccc;
                    width: 100%;
                }
                h2{
                    font-weight: 700;
                    font-size: 18px;
                }
                section{
                    padding-top: 49px;
                    width: 100%;
                }
                nav{
                    bottom: 0;
                    position: fixed;
                    border-top: 1px solid #ccc;
                    height: 49px;
                    width: 100%;
                }


            `}</style>
        </AppLayout>



    )
}