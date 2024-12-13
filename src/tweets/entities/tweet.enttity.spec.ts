import { Tweet } from "./tweet.entity"

describe("Tweet Test", () => {
    it("shout creat a tweet", () =>{
        const tweet = new Tweet({
            content: "Hello World",
            screen_name: "ikarobruno"
        })

        expect(tweet.content).toBe('Hello World')
        expect(tweet.screen_name).toBe('ikarobruno')
    })
})