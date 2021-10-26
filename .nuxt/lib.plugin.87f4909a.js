import { createClient } from '@supabase/supabase-js'

export default function (_, inject) {
	const client = createClient('https://hkfomhpjagnnioxqgane.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw')
	inject('supabase', client)

	const auth = client.auth
	inject('supaAuth', auth)

	const storage = client.storage
	inject('supaStorage', storage)
}
