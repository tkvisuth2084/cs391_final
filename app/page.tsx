import Image from "next/image";

import styled from "styled-components";
export default function Home() {
  return (

      <div><Image src="/dog-headshot.jpg" alt = "dog-headshot" width={500} height={400} />
          <img src="/dog-headshot.jpg" width="500" />
          <p>Find youre new Best friend</p>
     </div>

  );
}
