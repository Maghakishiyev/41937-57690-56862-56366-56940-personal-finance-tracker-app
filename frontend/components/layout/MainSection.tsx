import PlusIcon from "../icons/PlusIcon";
import graph from "../../public/component2.png"
import Image from "next/image";
import VectorIcon from "../icons/VectorIcon";
import Link from "next/link";
import ArrowRightIcon from "../icons/ArrowRightIcon";


export const MainSection = () => {
    const consumptions:string[] = ["Groceries", "Medicine", "Restaurants & Food"];
    return (
      <section className="flex align-middle justify-between bg-white rounded shadow-md max-w-8xl max-h-[80vh]  mx-auto mt-16 pt-[30px] pb-8">
        <div className="flex flex-col justify-between ml-[28px] ">
            <h1 className=" text-custom-black text-[44px] font-bold font-jura">CashTrack</h1>
            <div className="flex flex-wrap gap-y-3 max-w-[383px] ">
                <div className="flex gap-4 items-center bg-[#E6E9ED] rounded text-[16px] px-1.5">
                    <div className="my-[7px] py-1 px-3 rounded bg-[#5698FF] text-white">NEW!</div>
                    <p className="text-custom-black">CashTrack is now available on web!</p>
                </div>
                <div>
                    <div className="text-custom-black text-[44px] font-bold ">
                        <h1 className="">
                            Efficient Money
                        </h1>
                        <div className="flex items-center">
                            <div >
                                <VectorIcon className="w-[109px] "/>
                            </div>
                            <h2 className="pl-3">
                                Tracking
                            </h2>
                        </div>
                        <h3 className="">
                            & Management
                        </h3>
                    </div>
                </div>
                <p className="text-[#43454F] text-[16px]">
                    Take full control of your money and achieve financial stability with CashTrack
                </p>
            </div>
            <div className="flex">
                <Link href="/login" legacyBehavior>
                    <a className="bg-black text-white text-lg px-4 py-2 rounded-lg mr-3">Sign In Now!</a>
                </Link>
                <Link href="/register" legacyBehavior>
                    <div className="flex items-center gap-3 bg-[#FEFCFB] cursor-pointer text-blue-800 text-lg px-4 py-2 rounded-lg shadow-lg">
                        <p>Sign Up</p>
                        <ArrowRightIcon/>
                    </div>
                </Link>
            </div>
        </div>
        <div className="flex flex-wrap gap-y-40 max-w-[660px] bg-gradient-to-tr from-[#0034D3] via-[#4477E5] to-[#92C5FA] mr-5 rounded-xl ">
            <div className="flex items-center justify-between mx-16 mt-8 text-white" style={{ width: '100%' }}>
                <div className="text-white">
                    <h1 className="text-[56px] font-bold font-jura">
                        $30,224
                    </h1>
                    <p className="font-jura font-semibold text-xl">Total money spent for the period</p>
                </div>
                <select id="years" className="bg-blue-300 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-2">
                    <option selected>Period: 2024</option>
                    <option value="2025">Period: 2025</option>
                    <option value="2026">Period: 2026</option>
                    <option value="2027">Period: 2027</option>
                    <option value="2028">Period: 2028</option>
                </select>

            </div>
            <div className="flex flex-wrap ml-6 gap-y-2">

            <div className="flex gap-4 items-center ">
                <div className="border size max rounded-[50%] bg-white p-[6px]">
                    <PlusIcon/>
                </div>
                <div className="flex gap-2.5">
                    {
                        consumptions.map((item: string) => (
                            <div className="border size-max rounded-xl bg-white p-[6px] px-3 py-[7px]"  key={item}>
                                {item}
                            </div> 
                        ))
                    }
                </div>
            </div>
            <div className="mb-6.5">
                <Image width={612} height={360} src={graph} alt="graph"  />
            </div>
            </div>
        </div>
      </section>
    );
  };