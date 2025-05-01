<template>
    <div>
        <button @click=getData>ALA</button>
    </div>
</template>
<script>
export default{
    data(){
        return{

        };
    },
    methods: {
        async getData(){
            await fetch("http://localhost:8000/api/v1/ala/", {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(text => console.log(text))
            // if(!response.ok){
            //     throw new Error("nie dziala")
            // }
            // console.log(response)

            // const data = response.json()
            // console.log(data)
        }
    }
}
</script>