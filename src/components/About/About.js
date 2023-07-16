import React from 'react'
import { Link } from 'react-router-dom'
export default function About() {
  return (
    <>
      <div className="card" style={{minHeight:'85vh'}}>
        <div className="card-header">About us</div>
        <div className="card-body">
          <h5 className="card-title">Motivation</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam iste soluta explicabo debitis culpa incidunt eos architecto repellendus neque eligendi, ratione distinctio eum dolor inventore quis aut possimus quod impedit quo excepturi, saepe ipsa! Debitis est illum unde officia fuga ex, deserunt sed reiciendis repudiandae laboriosam voluptatem quae aspernatur? Vitae dolor autem omnis, sunt aliquid magni doloribus molestias voluptatem vel perspiciatis nemo repudiandae nesciunt modi eligendi inventore eos aperiam, quisquam labore veritatis? Quasi maiores quo autem non dolore architecto consectetur nobis omnis, repellat, impedit qui magni voluptates corporis voluptatibus dolorem harum neque vero odit a, dicta natus? Itaque sequi dolores ea iure est eveniet, eaque voluptates eligendi officiis natus hic necessitatibus perferendis quibusdam vel omnis cupiditate nesciunt accusantium dicta illum consectetur architecto? Provident delectus laborum impedit blanditiis id laboriosam, nam maiores quaerat inventore praesentium sequi ea nemo quis assumenda. Iusto commodi, veritatis quidem voluptatum delectus non ad recusandae quaerat, facere officiis blanditiis, praesentium minima. Excepturi cumque adipisci aperiam voluptate perspiciatis, veniam harum ducimus officia ab reiciendis illum et laudantium aspernatur, eligendi eos? Dolor ratione non quaerat eligendi consectetur modi, similique quod labore optio quia. Asperiores maiores assumenda error recusandae eveniet blanditiis beatae non sunt laudantium autem sed, itaque, ullam eum exercitationem necessitatibus illum. Sapiente ut provident omnis mollitia cum veniam excepturi illo facilis odio adipisci corrupti ipsam commodi, assumenda atque sint, labore unde expedita temporibus quas laudantium, nisi dolores ipsum. Hic fugit neque praesentium ipsum quasi consequuntur enim, ea quisquam? A ex deleniti voluptatem adipisci dolorem possimus modi tempore illum perferendis quas. Obcaecati quidem iste assumenda quia sint eos, deserunt beatae eum facere, odio officiis, doloremque consectetur? Esse saepe fugit nesciunt aut. Eligendi quod accusamus nisi animi, repellendus commodi! Animi qui voluptas inventore consequatur modi praesentium iusto, soluta corrupti aliquam neque asperiores itaque amet. Voluptatem autem corrupti ad aperiam veniam laudantium aspernatur provident ea. Cupiditate molestiae, consequatur assumenda dolores rerum ad tempore dignissimos officiis quae cum autem, ut sed aliquam iure magnam aperiam ducimus 
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </div>

    </>
  )
}
