import { useState } from "react"

const Index = () => {
  const [contractAddress, setContractAddress] = useState("")
  const [events, setEvents] = useState([])
  const [url, setURL] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")

  const submitContractAddress = (e) => {
    e.preventDefault()
    console.log(contractAddress)

    fetch("/api/getABI", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ contractAddress }),
    })
      .then((response) => response.json())
      .then((data) => {
        const abi = JSON.parse(data)

        const events = abi.filter((item) => item.type === "event")
        setEvents(events)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const createListener = (e) => {
    e.preventDefault()

    console.log(events[selectedEvent])
  }

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-3/5 appearance-none leading-normal"
          type="text"
          placeholder="Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <br />
        <button
          onClick={submitContractAddress}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>
      <div className="grid m-10">
        {events.length > 0 && (
          <h1 className="font-bold text-2xl col-span-2 text-red-300">
            Events Available
          </h1>
        )}
        {events.length > 0 &&
          events.map((event, index) => {
            return (
              <div
                key={index}
                className="border-solid rounded-lg border-4 p-5 m-2"
              >
                <input
                  type="radio"
                  name="event"
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  value={index}
                />
                <h3 className="font-bold text-white">{event.name}</h3>
                <p className="text-orange-500">
                  {event.inputs.map((input, index) => {
                    return (
                      <span key={index}>
                        {input.name} - {input.type}
                      </span>
                    )
                  })}
                </p>
              </div>
            )
          })}
      </div>
      <div>
        {events.length > 0 && (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="font-bold text-2xl text-green-300">
              Event Action
            </div>
            <p className="text-green-300">What to do when we hear an event?</p>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            ></label>
            <input
              type="text"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-1/3 appearance-none leading-normal"
              placeholder="URL"
              onChange={(e) => setURL(e.target.value)}
            />
            <br />
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={(e) => createListener(e)}
            >
              Start Listening
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Index
