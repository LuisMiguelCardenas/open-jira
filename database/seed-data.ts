interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status:string
  createdAt: number;
}


export const seedData:SeedData = {
  entries:[
    {
      description:'pending lorem',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description:'inprogress lorem',
      status: 'in-progress',
      createdAt: Date.now() -1000000
    },
    {
      description:'finished lorem',
      status: 'finished',
      createdAt: Date.now() -100000
    }
  ]
}