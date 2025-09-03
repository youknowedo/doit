<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import type { PageProps } from './$types';

	const props: PageProps = $props();
</script>

<div>
	{JSON.stringify(props.data.session?.user)}
	<SignIn provider="github" signInPage="login" />
</div>
